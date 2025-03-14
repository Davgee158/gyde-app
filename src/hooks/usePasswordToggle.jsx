import {useState } from 'react'
import eyeIcon from "../assets/view.png";
import eyeOffIcon from "../assets/hide.png";


const usePasswordToggle = () => {
    const [visible, setVisibility] = useState(false);

    const togglePasswordVisiblity = () => {
        setVisibility((visibility) => !visibility);
    }

    const Icon = visible ? eyeIcon : eyeOffIcon;
  return {visible, Icon, togglePasswordVisiblity};
}

export default usePasswordToggle