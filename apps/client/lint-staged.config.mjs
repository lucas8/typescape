import { resolve, sep } from 'path';

const config = {
  '*.{js,mjs,cjs,ts,mts,cts,tsx}': ['eslint --cache --fix', 'prettier --write --ignore-unknown'],

  /**
   * Run typechecking if any type-sensitive files or project dependencies was changed
   * @param {string[]} filenames
   * @return {string[]}
   */
  '{package-lock.json,packages/**/{*.ts,*.tsx,tsconfig.json}}': filenames => {
    // if dependencies was changed run type checking for all packages
    if (filenames.some(f => f.endsWith('package-lock.json'))) {
      return ['yarn typecheck'];
    }

    // else run type checking for staged packages
    const fileNameToPackageName = filename =>
      filename.replace(resolve(process.cwd(), 'packages') + sep, '').split(sep)[0];
    return [...new Set(filenames.map(fileNameToPackageName))].map(p => `yarn typecheck:${p}`);
  },
};

export default config;
