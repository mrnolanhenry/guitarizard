import type { TunedString } from "./TunedString";
import { NoteFretNumberPair } from "./NoteFretNumberPair";
import { IStringConfig } from "./IStringConfig";

export class StringScale {
  tunedString: TunedString;
  config: IStringConfig;
  notes: NoteFretNumberPair[];

  constructor(
    tunedString: TunedString,
    config: IStringConfig,
    notes: NoteFretNumberPair[]
  ) {
    this.tunedString = tunedString;
    this.config = config;
    this.notes = notes;
  }
}
