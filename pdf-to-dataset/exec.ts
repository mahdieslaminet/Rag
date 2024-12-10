import { exec } from "child_process";

export const promiseExec = (command: string) => {
  return new Promise((resolve, reject) => {
    exec(command, (error, stdout, stderr) => {
      if (!!error) return reject(error);
      if (!!stderr) return reject(stderr);
      resolve(stdout);
    });
  });
};
