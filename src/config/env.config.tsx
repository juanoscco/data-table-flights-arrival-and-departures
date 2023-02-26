interface EnvConfig {
  secretKey: string;
}

const envConfig: EnvConfig = {
  secretKey: process.env.REACT_APP_SECRET_KEY || "",
};
export default envConfig;
