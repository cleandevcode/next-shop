import React from 'react';
import Card from "./productCard";
import styled from "styled-components";

const Container = styled.div`
      display: flex;
      flex-wrap: wrap;
`;

export default function CardContainer({rows}) {

    if (rows?.length === 0) return null;

    const getVisibleRows = () =>
        rows.slice(0, 10);

    return (
        <Container>
        {getVisibleRows().map(row=> (
            <Card row={row} />
        ))
        }
        </Container>
    );
}