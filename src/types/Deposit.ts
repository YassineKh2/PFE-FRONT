import { z } from "zod";

import {
  DepositSchema,
  DepositDetailsSchema,
  DepositOtherDetailsSchema,
} from "@/schemas/Deposit";

export type Deposit = z.infer<typeof DepositSchema>;

export type Section1 = z.infer<typeof DepositDetailsSchema>;

export type Section2 = z.infer<typeof DepositOtherDetailsSchema>;
