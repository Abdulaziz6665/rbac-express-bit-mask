import pool from '../configs/postgres'

export const fetch = async <T>(SQL: string, ...params: any[]): Promise<T | undefined> => {
  const client = await pool.connect()
  try {
    const {
      rows: [row],
    } = await client.query(SQL, params)
    return row
  } catch (e) {
    console.log(e, SQL, params)
  } finally {
    client.release()
  }
}

export const fetchAll = async <T>(SQL: string, ...params: any[]): Promise<T[] | any[]> => {
  const client = await pool.connect()
  try {
    const { rows } = await client.query(SQL, params)
    return rows || []
  } catch (e) {
    console.log(e, SQL, params)
    return []
  } finally {
    client.release()
  }
}
