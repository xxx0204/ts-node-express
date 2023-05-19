/// <reference path="../../typings.d.ts" />
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Tags } from '../models/tags'
import { BookOrigin } from '../models/bookOrigin';
import { BookInfos } from '../models/bookInfos';

const tagsModel = new Tags();
const bookOrigin = new BookOrigin();
const bookInfos = new BookInfos();

const router: Router = Router();

router.get('/tags', async (req: Request, res: Response) => {
  let db = req.db;

  try {
    let rs: any = await tagsModel.getTags(db);

    if (rs.length) {
      res.send({ ok: true, data: rs, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Get tags failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
})

router.get('/bookOrigin',async (req: Request, res: Response) => {
  let db = req.db;

  try {
    let rs: any = await bookOrigin.getBookOrigin(db);

    if (rs.length) {
      res.send({ ok: true, data: rs, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Get bookOrigin failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
})

router.get('/bookInfos',async (req: Request, res: Response) => {
  let db = req.db;

  try {
    let rs: any = await bookInfos.getBookInfos(db);

    if (rs.length) {
      res.send({ ok: true, data: rs, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Get bookInfos failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
})

router.get('/allKeys',async (req: Request, res: Response) => {
  let db = req.db;

  try {
    let rs: any = await bookInfos.getAllKeys(db);

    if (rs.length) {
      res.send({ ok: true, data: rs, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Get allKeys failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
})

export default router