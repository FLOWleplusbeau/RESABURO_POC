// See https://kit.svelte.dev/docs/types#app

import type { User } from "@prisma/client";
import type { PrismaClient } from "@prisma/client/extension";

// for information about these interfaces
declare global {
  namespace App {
    // interface Error {}
    interface Locals {
      user: User | null;
    }
    // interface PageData {}
    // interface PageState {}
    // interface Platform {}
  }
  var prisma: PrismaClient;
}

export {};
