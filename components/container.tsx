import React from 'react';
import Card from "./productCard";

export default function CardContainer({rows}) {

    if (rows?.length === 0) return null;

    const getVisibleRows = () =>
        rows.slice(0, 10);

    return (
        <div className="container">
        {getVisibleRows().map(row=> (
            <Card row={row} />
        ))
        }
        <style jsx>
            {`
            .container {
                display: flex;
                flex-wrap: wrap;
            }
            `
            }
        </style>
        </div>
    );
}