import { createContext, useState, useContext } from 'react';

export const RewardContext = createContext();

export const useReward = () => useContext(RewardContext);

export const RewardProvider = (props) => {
    const [currentReward, setCurrentReward] = useState(null);

    return (
        <RewardContext.Provider
            value={{
                currentReward,
                setCurrentReward
            }}
            >
                {props.children}
            </RewardContext.Provider>
    )
};
