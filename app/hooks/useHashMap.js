import { useContext, useEffect,useRef, useState,useCallback, useLayoutEffect } from "react";

const useHashMap = () => {
    const [hashMap, setHashMap] = useState({});
  
    const addToHashMap = (key, value) => {
      setHashMap(prevHashMap => ({
        ...prevHashMap,
        [key]: value,
      }));
    };
  
    const removeFromHashMap = (key) => {
      setHashMap(prevHashMap => {
        const updatedHashMap = { ...prevHashMap };
        delete updatedHashMap[key];
        return updatedHashMap;
      });
    };
  
    return [hashMap, addToHashMap, removeFromHashMap];
  };

export {useHashMap}