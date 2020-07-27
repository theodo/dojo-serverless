import React, { useState } from 'react';
import { useAsync } from 'react-use';
import { Typography, Row, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import styled from 'styled-components';

import virus1 from 'assets/Virus1.png';
import virus2 from 'assets/Virus2.png';
import virus3 from 'assets/Virus3.png';
import virus4 from 'assets/Virus4.png';
import virus5 from 'assets/Virus5.png';
import virus6 from 'assets/Virus6.png';

import { websocketConnexion } from '../services/networking/websocket';

const VirusImgs = [virus1, virus2, virus3, virus4, virus5, virus6];

const { Title, Text } = Typography;
const FixedTitle = styled(Title)`
  height: 40px;
`;

const Container = styled.div`
  height: calc(100vh - 240px);
  width: calc(100vw - 200px);
`;

const PlayGround = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
`;

interface VirusProps {
  id: string;
  positionX: number;
  positionY: number;
  src: string;
}

const AddVirusButton = styled(Button)`
  position: fixed;
  right: 20px;
  top: 10px;
`;

const Virus = styled.img<VirusProps>`
  position: absolute;
  left: ${(props) => props.positionX}%;
  top: ${(props) => props.positionY}%;
  cursor: not-allowed;
`;

const getRandomPosition = (n: number) => Math.floor(Math.random() * n);

const getRandomVirus = (id: string) => ({
  id,
  positionX: getRandomPosition(100),
  positionY: getRandomPosition(100),
  src: VirusImgs[getRandomPosition(6)],
});

export default () => {
  const [viruses, setViruses] = useState<VirusProps[]>([]);

  useAsync(async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_BASE_URL}/virus`,
      { method: 'GET' },
    );
    const { viruses } = await response.json();
    setViruses(viruses.map(({ id }: { id: string }) => getRandomVirus(id)));
  });

  const addVirus = async () => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/virus`, {
      method: 'POST',
    });
  };

  const killVirus = async (virusId: string) => {
    await fetch(`${process.env.REACT_APP_API_BASE_URL}/virus/${virusId}`, {
      method: 'DELETE',
    });
    setViruses((prevViruses) => prevViruses.filter(({ id }) => id !== virusId));
  };

  websocketConnexion.onmessage = (message) => {
    const data = JSON.parse(message.data);
    const virusId = data.virusId;
    if (virusId) {
      setViruses((prevViruses) => prevViruses.concat(getRandomVirus(virusId)));
    }
  };

  return (
    <>
      <AddVirusButton
        shape="round"
        icon={<PlusOutlined />}
        danger
        onClick={addVirus}
      />
      <Row justify="center">
        <FixedTitle>Welcome to Covid-Clicker</FixedTitle>
      </Row>
      <Row justify="center">
        <Text>Click on a virus to kill it</Text>
      </Row>
      <Container>
        <PlayGround>
          {viruses.map((virus) => (
            <Virus
              key={virus.id}
              {...virus}
              onClick={() => {
                killVirus(virus.id);
              }}
            />
          ))}
        </PlayGround>
      </Container>
    </>
  );
};
