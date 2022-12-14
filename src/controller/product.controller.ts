import { Request, Response, NextFunction } from "express";
import { AppError } from "../utils/appError";
import Products from "../models/product.model";

const catchAsync = (fn: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next)
  }
}

const getProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    const queryObj = { ...req.query }
    const sort: any = req.query.sort
    const {id} = req.query

    let queryStr = JSON.stringify(queryObj)
    queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`)
    
    let query = Products.find(JSON.parse(queryStr))
    
    if (id) {
      query = Products.find({_id: id})
    }

    if (sort === "name") {
      query = query.sort(sort)
    } else {
     query = query.sort(`-${sort}`) 
    }

    const products = await query

    res.status(200).json({
      status: "success",
      error: false,
      data: {
        products,
      },
    });
})

const getProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.params
  const product = await Products.findById(id)
  res.status(200).json({
    status: "success",
    error: false,
    data: {
      product
    }
  })
})

const getSerchedProducts = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
  const { q } = req.query
  const queryString = new RegExp(`${q}`)
    const products = await Products.find({name: {$regex: queryString, $options: 'i'}})
    
    res.status(200).json({
      status: "success",
      error: false,
      results: products.length,
      data: {
        products
      }
    })
})

const createProduct = catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    if (!req.body) next(new AppError(`Can't find ${req.originalUrl} path on the server`, "404"))

    await Products.create({
      ...req.body
    });

    res.status(201).json({
      status: "success",
      error: false,
    })
})

export { getProducts, getProduct, createProduct, getSerchedProducts };
