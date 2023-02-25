import React from 'react';
import { Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { useAppSelector } from '../../hooks/redux';

Chart.register(CategoryScale);

const BarChart = () => {
    const { sales } = useAppSelector((state) => state.userReducer);
    const salesNumber:number[] = [];
    sales.map((value) => salesNumber.push(value.sales_number));
    const nameofProduct: string[] = [];
    sales.map((value) => nameofProduct.push(value.product));

    return (
        <div style={{ width: '100%', height: 400 }}>
    <h1>Sales number per product</h1>
    <Bar
    data={{
        labels: nameofProduct,
            datasets: [
            {
                label: '# Sales number per product',
                data: salesNumber,
                backgroundColor: [
                    'rgba(1,20,222,0.2)',
                ],
                borderColor: [
                    'rgba(1,20,222,0.2)',
                ],
                borderWidth: 3 ,
            },
        ],
    }}
    height={200}
    width={400}
    options={{
        maintainAspectRatio: false,
            scales: {},
    }}
    />
    </div>
);
};

export { BarChart };