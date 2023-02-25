import React, {useEffect} from 'react';
import SelectInput from '../../shared/SelectInput/SelectInput';
import VisionValue from '../../shared/VisionValue/VisionValue';
import {useNavigate, useParams} from "react-router-dom";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {getAllUserSales, getUserById} from "../../store/slices/user.slice";
import DataGridStat from "../../shared/DataGrid/DataGrid";
import { BarChart } from '../../shared/Chart/Chart';
import VisibleButton from "../../shared/VisibleButton/VisibleButton";

const StatisticsPage = () => {
    const {id} = useParams()
    const dispatch = useAppDispatch()
    const navigate = useNavigate();
    const userStore = useAppSelector((state) => state.userReducer);
    const {user, sales} = userStore;

    const columns = [{
        id:1,
        field: 'product',
        name: 'product',
        flex: 1,
        minWidth: 150,
    }, {
        id:2,
        field: 'revenue',
        name: 'revenue',
        flex: 1,
        minWidth: 150,
    }, {
        id:3,
        field: 'sales_number',
        name: 'sales_number',
        flex: 1,
        minWidth: 150,
    }, {
        id:4,
        field: 'date',
        name: 'date', 
        flex: 1,
        minWidth: 150,
    }]


    useEffect(() => {
        if (id) {
            dispatch(getUserById(id))
            dispatch(getAllUserSales())
        }
    }, [])

    return (
        <div className={'data-container'}>
            <VisibleButton label={'Update User'} onClick={() => navigate(`/user/${id}`)}></VisibleButton>
            <h3 className={'district-header'}>Personal Information</h3>
            <div className={'user-info'}>
                <VisionValue name={'name'} value={user.name}/>
                <VisionValue name={'Age'} value={user.age}/>
                <VisionValue name={'Gender'} value={user.gender}/>
                <VisionValue name={'Email'} value={user.email}/>
                <VisionValue name={'Country'} value={user.country}/>
                <VisionValue name={'City'} value={user.city}/>
            </div>

            <div style={{
                display: "flex",
                justifyContent: 'space-between'
            }}>
                <div style={{
                    width: '40%'
                }}>
                    <div className={'static'}>
                        <div><h3>Data</h3></div>
                        <div style={{width: '150px'}}><SelectInput label={'OrderBy'} options={columns} /></div>
                    </div>
                    <DataGridStat rows={sales} columns={columns}/>
                </div>

                <div style={{
                    width: '40%'
                }}>
                    <div className={'static'}>
                        <h3>Chart</h3>
                        <div style={{width: '150px'}}><SelectInput label={'Y-Axis'}/></div>
                    </div>
                    <BarChart/>
                </div>
            </div>

        </div>
    );
};

export default StatisticsPage;