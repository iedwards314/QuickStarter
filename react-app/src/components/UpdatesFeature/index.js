import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUpdates } from '../../store/updates';

const UpdatesFeature = () => {
    return (

        <p>Hitting Updates</p>
    )
}

export default UpdatesFeature;
