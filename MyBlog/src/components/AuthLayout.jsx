import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

function Protected({ children, authentication = true }) {      //  --> authentication has not done yet its just passed for future references



  const authStatus = useSelector((state) => state.auth.status); // this state has been got from auth through 
                                                                // redux store and it is the syntax for useSlector from redux
                                                                //  store (refer docs)

                                                                // auth comes from authslice which is name : "auth" 
                                                                // through store which is placed as a provider in main.jsx
                                                                // main -> store -> authslice -> authlayout (auth is passed) 

  const navigate = useNavigate();

  const [loader, setLoader] = useState(true);

  useEffect(() => {
    if (authentication && authStatus !== authentication) {
      navigate("/login");
    } else if (!authentication && authStatus !== authentication) {
      navigate("/");
    }

    setLoader(false);
  }, [authStatus, authentication, navigate]);

  return loader ? null : <>{children}</>;
}

export default Protected;
