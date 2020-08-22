import { Script } from './script';
export interface Solution {
  script: Script;
  time: number;
  memory: number;
  desc: string;
  code: string;
}
