import { eq } from "drizzle-orm";
import { db } from "../drizzle/db";
import { ContractorTable, UserTable } from "../drizzle/schema";

export const getAllContractors = async (sts_id?: number) => {
  try {
    if (sts_id)
      return await db.query.ContractorTable.findMany({
        where: (model) => eq(model.sts_id, sts_id),
      });
    return await db.query.ContractorTable.findMany({
      with: {
        contract: true,
        sts: true,
      },
    });
  } catch (error) {
    throw new Error("Error in getAllContractors");
  }
};

export const getContractorById = async (contractor_id: number, tx?: any) => {
  const dbCon = tx || db;
  try {
    return await dbCon.query.ContractorTable.findFirst({
      where: (model: any) => eq(model.id, contractor_id),
      with: {
        contract: true,
        sts: true,
      },
    });
  } catch (error) {
    throw new Error("Error in getting Contractor");
  }
};

export const createContractorManager = async (
  user_id: number,
  contractor_id: number
) => {
  try {
    return await db
      .update(UserTable)
      .set({ contractor_id })
      .where(eq(UserTable.id, user_id));
  } catch (error) {
    throw new Error("Error in updating Contractor");
  }
};

export const createContractor = async ({
  company_name,
  tin,
  mobile,
  payment_per_ton_waste,
  required_amount_waste,
  area_collection,
  sts_id,
}: any) => {
  try {
    return await db
      .insert(ContractorTable)
      .values({
        company_name,
        tin,
        mobile,
        payment_per_ton_waste,
        required_amount_waste,
        area_collection,
        sts_id,
      })
      .returning();
  } catch (error) {
    throw new Error("Error in inserting contractors");
  }
};

export const deleteContractor = async (contractor_id: number) => {
  try {
    return await db
      .delete(ContractorTable)
      .where(eq(ContractorTable.id, contractor_id));
  } catch (error) {
    throw new Error("Error in Deleting contractors");
  }
};
