/// <reference path="../../typings.d.ts" />
import { Router, Request, Response } from 'express';
import * as HttpStatus from 'http-status-codes';
import { Tags } from '../models/tags'
import { BookOrigin } from '../models/bookOrigin';
import { BookInfos } from '../models/bookInfos';
import { Words } from '../models/words';

const tagsModel = new Tags();
const bookOrigin = new BookOrigin();
const bookInfos = new BookInfos();
const words = new Words();

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
    let bookInfosRs: any = await bookInfos.getBookInfos(db);
    let bookOriginRs: any = await bookOrigin.getBookOrigin(db);
    let tagsRs: any = await tagsModel.getTags(db);

    bookInfosRs.forEach(it => {
      it.book_origin = bookOriginRs.filter(i => {
        return i.id == it.book_origin_id;
      })[0];
      it.tags = tagsRs.filter(i => {
          return it.tags.indexOf(i.id) > -1;
        }
      )
    });

    if (bookInfosRs.length) {
      res.send({ ok: true, data: bookInfosRs, code: HttpStatus.OK });
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
    let rs: any = await bookInfos.getAllKeys(db, req.query.id);

    if (rs.length) {
      res.send({ ok: true, data: rs, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Get allKeys failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error.message, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
})

router.get('/search', async (req: Request, res: Response) => {
  try {
    let rs: any = await words.getWords(req.db, req.query.bookId, req.query.word);

    function decrypt(msg, key) {
      const secretMsg = msg.split('-');
      const ret = [];  
      for (let i = 0; i < secretMsg.length; i++) {    
        ret[i] = String.fromCharCode(secretMsg[i] - key);  
      }  
      return ret.join("");
    }

    rs.forEach(it => {
      it.content = JSON.parse(decrypt(it.content, 745839))
    });

    if (rs.length) {
      res.send({ ok: true, data: rs, code: HttpStatus.OK });
    } else {
      res.send({ ok: false, error: 'Get words failed!', code: HttpStatus.UNAUTHORIZED });
    }
  } catch (error) {
    res.send({ ok: false, error: error, code: HttpStatus.INTERNAL_SERVER_ERROR });
  }
})

export default router