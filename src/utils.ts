import { Request, Response, NextFunction } from 'express';

export const safe = (fn:any) => async (req: Request, res: Response, next: NextFunction) => {
	try{
		const fnReturn = await fn(req, res)
	}catch(err:any){
		res.status(err.status || 500);
		res.json({ message: err.message || err.msg || err });
		
		next(err);
	}
}

export class Exception extends Error{
	status: number = 400
	constructor(msg: string, status: number = 400){
		super();
		this.status = status || 400;
		this.message = msg;
	}
}
