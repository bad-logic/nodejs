import packageFile from "../../package.json";

interface IMeta {
  version: string;
  name: string;
}

const meta: IMeta = {
  version: packageFile.version,
  name: packageFile.name,
};

export { meta };
