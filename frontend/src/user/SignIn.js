import React from "react";
import Layout from "../core/Layout";
import {API} from "../config";

const SignIn = () => (
    <Layout title="Sign In" description="Sign in to stay ahead of others while getting the gas">
        {API}
    </Layout>
);

export default SignIn;