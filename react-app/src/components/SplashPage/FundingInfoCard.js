import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { getInfo } from '../../store/project';
import './style/funding-info.css';

const FundingInfoCard = () => {
    const info = useSelector(state => state.project.info)
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(getInfo())
    }, [dispatch])

    return (
        <div className='info-card-container'>
            <div className='info-card box-one'>
                <p className='info-card-data'>
                    {info?.projects}
                </p>
                <p className='info-card-text'>total projects</p>
            </div>
            <div className='info-card box-two'>
                <p className='info-card-data'>
                    ${info?.total}
                </p>
                <p className='info-card-text'>towards creative work</p>
            </div>
            <div className='info-card box-three'>
                <p className='info-card-data'>
                    {info?.contributions}
                </p>
                <p className='info-card-text'>backings</p>
            </div>
        </div>
    )
};

export default FundingInfoCard;
