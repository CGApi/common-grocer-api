# Scripts

The scripts in this folder are utilities for safely updating production data. You can safely run these in development but their main purpose is to be run from a github action to update production data without having to distribute production database credentials.

Each script has a help argument that will print off how to use the script. To run the scripts locally use the node --require syntax in your terminal:

```bash
node --require esbuild-register scripts/generate-consumer.ts --help
```
