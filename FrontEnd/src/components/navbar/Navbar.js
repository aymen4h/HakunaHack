import { Link } from 'react-router-dom';
import styleNavbar from './Navbar.module.css';
import { useNavigate } from 'react-router-dom';

function Navbar(){
    const navigate = useNavigate();
    return(
        <>
            <div className={styleNavbar.container}>
                <div className={styleNavbar.left}>
                    <img src='logo.jpg' alt='erreur' height='90px' width='90px' className={styleNavbar.logo} onClick={() => navigate('/')}/>
                </div>
                <div className={styleNavbar.middel}>
                    <Link to="/chat"className={styleNavbar.mid1}>Chat</Link>
                    <Link to="/map"className={styleNavbar.mid2}>Map</Link>
                    <Link to="/"className={styleNavbar.mid3}>News</Link>
                    {JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).userS.role === "Admin" && (
                        <Link to="/dashboard"className={styleNavbar.mid4}>dashboard</Link>
                    )}
                </div>
                <div className={styleNavbar.right} onClick={() => {
                    localStorage.setItem("user", null);
                    navigate("/login");
                }}>
                    <span id={styleNavbar.log}>Log Out</span>
                    <img id={styleNavbar.logoout} src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAAAyCAYAAAAeP4ixAAAACXBIWXMAAAsTAAALEwEAmpwYAAAEQklEQVR4nO1aS4gcZRD+1/UZnxFEoyii4ikHEfGNFx/4jiIYMRCNEI/eBI8SiYIHRTQaED15UaMXPZmgCAqKiJp4cDVoHgZE81jTVd1VXRVLamZ3nen+d5np6Z7ekXzQMIf+66+vq/766zEhHMf/FEfNzktZHwaWV5F1O7DsA5IEWa3zkBwFlgPIusPfSVgf9TVhOcDMTgPWx5D1UyA5tqD0gI+vAdIvgXWDmZ3eDgHSp5Hlj2GVX/QhOQSkz4yNEJDcCyy/1kagaCWWA0jyQGMEzOxUINm6hJv8A6RfIctmJLmfyK40szPm1/9ldmaW2RVIsgZZngPSr5d0R5J3ardOktj5SPrtIhseceWzzC4bVm6W2aVOCkkOxmXrd2lql9RCwjcDlt0RCzCyvHDQ7KxR9zhsdnbXSsIRV9uXZXb5yJYAll8iX+rHhHn1qARK+zGvditEyOxFtAsrCTWzU4D0m7JQ/cDMVtRNomffFcD6XoTMy5UEAstrkfPwtplNh4ZhZicgyVsFIq8MLQgyuSNiiQ/HQaKPTDcC+v3yBYCtCsO6FLL8VPgaP3v4DJMEJH2qEJ0EmK8KkwQzO9nDXcEaL7Wky7SZTVVa7NlrwRrJrNm5YcwA1g1AAkjyJ5I8OLQAZP24bWuY2bSn/L2unbKuHViAH2YgyXuJNHHpDRh6DxXPacr6yEACgOTu4u0dWgKSPOTKVyLTidmjXkA1ImVdW4mMX3j9bqXrQstIq5BB0l19rpXn14RlgHRYMsDyex+RqtnmQhivsQzmaCGnXqSVNkeSv3tfrFpnzEWdeKFUNxmWvTEis70vebFTkchU09bA/4jsLikALPsLrnVRFSIdWSR3FRPPBlyLkkxuK22OpD8UDvt1YRkAWDd6Y6NIAkjuWWzB+/1m0/Vj13pUEg5k2VRY8HqYNBKOJJPbCwdpJrSEhHVdJRILRT8J9ZPhq0MLwHLSOBiJeXiHpCBgS2gB2HMPDU1iTsCaApEUwC5oTOMl9ACWPR7Ck0xurVTUeKOhQGZrmEQA68YCkWNpnt8QJg1mdiKS7ixEsN9mzVa2qNNUpYVpnt8caflv9y5LGBPM7CS/yzphmHSXN9MrCUKW58tJmm4bBxlzEqzbaomgHRdj/SySsO1o0s1mzVYi6yflfeXFykKPmJ1TSia7Z2ZPmuc31cpg3qU5MothmRl5Auz3SJSMnyGSN4duLsf3WAUkb8RGcU5ilGq1bJm4mzmhzJWoUuN7T9l9H0gwLls/r30W3z0zsnmpAaa7hV+gwPo45vn1aWoXu8/7h/BZIOb5tXPt0C0xF8Iea3s7qtHAkub5jUj6fWOVH8tMmue3hHHArQOsT0Tni9UJ7Mdcn/TQOxYSkYbzfT7z8wRzaOVJMmT9yJNE/zhhOcD/1uGZKrI8CyTvuvt1prEkh30W3/2tO7sltWyCTO5scqh6HKFl/Asonc3dUARJygAAAABJRU5ErkJggg==" />
                </div>
            </div>
        </>
    );
}
export default Navbar;