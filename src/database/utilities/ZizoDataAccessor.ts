import { Knex } from 'knex';
import bunyan from 'bunyan';
import { DatabaseOperations } from '../../../@types/database/DatabaseOperations';
import { SelectableDataTypes } from '../../../@types/database/Data';
import CustomError from '../../misc/Error';

/**
 * ZizoDataAccessor class that implements the DatabaseOperations interface.
 * @implements {DatabaseOperations}
 */
class ZizoDataAccessor implements DatabaseOperations {
	/**
	 * @private
	 * @type {Knex}
	 */
	private db: Knex;

	/**
	 * @private
	 * @type {bunyan}
	 */
	private log: bunyan;

	/**
	 * Constructs a new ZizoDataAccessor.
	 * @param {Knex} db - The database connection.
	 * @param {bunyan} logger - The logger.
	 */

	constructor(db: Knex, logger: bunyan) {
		this.db = db;
		this.log = logger;
	}

	/**
	 * Checks if a record exists in the database.
	 * @async
	 * @param {string} table - The table to check.
	 * @param {string} column - The column to check.
	 * @param {string} value - The value to check.
	 * @returns {Promise<boolean>} - Returns true if the record exists, false otherwise.
	 */
	async recordExists(table: string, column: string, value: string): Promise<boolean> {
		try {
			const count = await this.db(table)
				.where(column, value)
				.limit(1);

			return count.length > 0;
		} catch (error) {
			this.log.error(`Error checking if record exists in table ${table}:`, error);
			throw new CustomError(`DATABASE_ERROR⚠️:: Error checking if record exists in table ${table}:`, 400, error);

		}
	}

	/**
	 * Saves a record to the database.
	 * @async
	 * @param {string} table - The table to save to.
	 * @param {T[] | T} values - The values to save.
	 * @returns {Promise<T>} - Returns the saved record.
	 */
	async save<T>(table: string, values: T[] | T): Promise<T> {

		if (!table) {
			throw new Error('Table name cannot be empty');
		}

		if (!values) {
			throw new Error('Values cannot be empty');
		}
		try {

			const results = await <T>this.db(table).insert(values).returning('*') as unknown as T[];

			return results[0] as T;
		} catch (e) {
			const error = e as Error;
			throw new Error(error.message);
		}
	}

	/**
	 * Selects a record from the database.
	 * @param {string} table - The table to select from.
	 * @param {string} column - The column to select.
	 * @param {string} value - The value to select.
	 * @returns {Promise<T>} - Returns the selected record.
	 */
	selectRecord<T>(table: string, column: string, value: string): Promise<T> {
		try {
			return this.db(table)
				.where(column, value)
				.first();
		} catch (error) {
			this.log.error(`Error checking if record exists in table ${table}:`, error);
			throw new CustomError(`Error checking if record exists in table ${table}:`, 400, error);
		}
	}

	/**
	 * Updates a record in the database.
	 * @async
	 * @param {string} table - The table to update.
	 * @param {number | string} id - The id of the record to update.
	 * @param {Partial<T>} values - The values to update.
	 * @returns {Promise<T>} - Returns the updated record.
	 */
	async updateRecord<T>(table: string, id: number | string, values: Partial<T>): Promise<T> {
		try {
			return <T>this.db(table)
				.where({ id })
				.update(values)
				.returning('*');

		} catch (error) {
			this.log.error(`DATABASE_ERROR⚠️:: Error updating data in table ${table}:`, error);
			throw new CustomError(`DATABASE_ERROR⚠️:: Error updating data in table ${table}:`, 400, error);
		}
	}

	/**
	 * Selects all records from the database that match the given value.
	 * @param {string} table - The table to select from.
	 * @param {string} column - The column to select.
	 * @param {SelectableDataTypes} value - The value to select.
	 * @returns {Promise<T[]>} - Returns the selected records.
	 */
	selectAll<T>(table: string, column: string, value: SelectableDataTypes): Promise<T[]> {
		try {
			return this.db(table)
				.where(column, value).returning('*');
		} catch (error) {
			this.log.error(`Error checking if record exists in table ${table}:`, error);
			throw new CustomError(`DATABASE_ERROR⚠️:: Error checking if record exists in table ${table}:`, 400, error);
		}
	}

}

export default ZizoDataAccessor;