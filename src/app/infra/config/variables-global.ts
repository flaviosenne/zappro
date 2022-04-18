import { tmpdir } from 'os'

export const DB_HOST = process.env.DB_HOST || ''
export const DB_PORT = process.env.DB_PORT || ''
export const DB_USERNAME = process.env.DB_USERNAME || ''
export const DB_PASS = process.env.DB_PASS || ''
export const DB_DATABASE = process.env.DB_DATABASE || ''

export const SECRET = process.env.SECRET || ''

export const TEMP_DIR = tmpdir()


