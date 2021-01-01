import React from 'react';

// Import dependencias
import Chart from "react-google-charts";
import ClipLoader from "react-spinners/ClipLoader";

const Loader = () => {
    return(
        <ClipLoader
            css={[
                {display:'flex'},
                {margin: '0 auto'},
                {marginBottom: 25},
                {borderColor: 'var(--main_color)'},
                {position: 'relative'},
                {top: '15px'}
            ]}
            size={20}
        />
    )
}

export default function PieChart(props){
    return(
        <Chart
        width={'100%'}
        height={'100%'}
        className="pie_chart_admin"
        chartType="PieChart"
        loader={<Loader/>}
        data={(props.data.total_stock !== 0) ?
            [
                ['Referencia', 'Cantidad de Productos'],
                ['Restante', props.data.remaining_stock],
                ['Consumido', (props.data.total_stock - props.data.remaining_stock)]
            ]
            :
            [
                ['Referencia', 'Cantidad de Productos'],
                ['Restante', 10],
                ['Consumido', 0]
            ]
        }
        rootProps={{ 'data-testid': '1' }}
        options={{
                backgroundColor: 'transparent', 
                colors: ['rgb(202, 0, 0)', 'green'], 
                fontSize: '16px', 
                legend: {position: 'none'}
        }}
    />
    )
}