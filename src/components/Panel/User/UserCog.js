import React from 'react';
import Breadcrumb from "../Breadcrumb";
import HardwareRegisterForm from "./HardwareRegisterForm";

function UserCog({account}) {
    return (
        <div id="user_cog">
            <Breadcrumb title="User settings"/>
            <div className="row justify-content-around">
                {account.isCustomer ? <HardwareRegisterForm /> : null}
            </div>
        </div>
    );
}

export default UserCog;