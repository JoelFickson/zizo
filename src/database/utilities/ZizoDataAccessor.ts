import { Knex } from 'knex';
import bunyan from 'bunyan';
import { DatabaseOperations } from '../../../@types/database/DatabaseOperations';
import { SelectableDataTypes } from '../../../@types/database/Data';
import CustomError from '../../misc/Error';

class ZizoDataAccessor implements DatabaseOperations {
	private db: Knex;

	private log: bunyan;

	constructor(db: Knex, logger: bunyan) {
		this.db = db;
		this.log = logger;
	}

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