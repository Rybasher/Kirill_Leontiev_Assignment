import React, {FC} from 'react';

const VisionValue: FC<{ name?: string, value?: string }> = ({name, value}) =>  {
    return (
        <div className={'vision-value'}>
            <h3>{name}:</h3>
            <div>{value}</div>
            </div>
    );
};

export default VisionValue;