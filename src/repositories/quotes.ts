import "server-only";

import { ObjectId } from "mongodb";
import { quotesCollection } from "@/lib/db/collection";
import type { InitialQuote, Quote } from "@/type";
import type { QuoteDocument } from "@/lib/db/quote-document";

function toQuote(document: QuoteDocument): Quote {
  return {
    id: document._id.toHexString(),
    quote: document.quote,
    author: document.author,
    likedBy: document.likedBy ?? [],
    createdBy: document.createdBy,
    createdAt: document.createdAt,
    updatedAt: document.updatedAt,
    category: document.category,
    tags: document.tags ?? [],
  };
}

function parseQuoteObjectId(quoteId: string): ObjectId | null {
  if (!ObjectId.isValid(quoteId)) {
    return null;
  }

  return new ObjectId(quoteId);
}

export async function listAllQuotes(): Promise<Quote[]> {
  const collection = await quotesCollection();
  //.sort({ _id: 1 }) - ascending order
  const documents = await collection.find({}).sort({ _id: 1 }).toArray();
  return documents.map(toQuote);
}

export async function listFavouriteQuotes(userId: string): Promise<Quote[]> {
  const collection = await quotesCollection();
  const documents = await collection
    .find({ likedBy: userId })
    .sort({ _id: 1 })
    .toArray();
  return documents.map(toQuote);
}

export async function insertQuote(input: {
  quote: string;
  author: string;
  createdBy: string;
  category: string;
  tags: string[];
}): Promise<Quote> {
  const collection = await quotesCollection();
  const now = new Date().toISOString();
  const document: QuoteDocument = {
    _id: new ObjectId(),
    quote: input.quote,
    author: input.author,
    likedBy: [],
    createdBy: input.createdBy,
    createdAt: now,
    updatedAt: now,
    category: input.category,
    tags: input.tags,
  };
  await collection.insertOne(document);

  return toQuote(document);
}

export async function updateQuoteLikedBy(
  quoteId: string,
  userId: string,
): Promise<Quote | null> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return null;
  }

  const collection = await quotesCollection();
  const existing = await collection.findOne({ _id: objectId });

  if (!existing) {
    return null;
  }

  const alreadyLiked = (existing.likedBy ?? []).includes(userId);
  const updated = await collection.findOneAndUpdate(
    { _id: objectId },
    alreadyLiked
      ? { $pull: { likedBy: userId } }
      : { $addToSet: { likedBy: userId } },
    { returnDocument: "after" },
  );

  return updated ? toQuote(updated) : null;
}

export async function deleteQuoteById(quoteId: string): Promise<boolean> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return false;
  }

  const collection = await quotesCollection();
  const result = await collection.deleteOne({ _id: objectId });
  return result.deletedCount === 1;
}

export async function getQuoteById(quoteId: string): Promise<Quote | null> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return null;
  }

  const collection = await quotesCollection();
  const document = await collection.findOne({ _id: objectId });

  return document ? toQuote(document) : null;
}

export async function updateQuoteById(
  quoteId: string,
  input: {
    quote: string;
    author: string;
    category: string;
    tags: string[];
  },
): Promise<Quote | null> {
  const objectId = parseQuoteObjectId(quoteId);

  if (!objectId) {
    return null;
  }

  const collection = await quotesCollection();

  const result = await collection.updateOne(
    { _id: objectId },
    {
      $set: {
        quote: input.quote,
        author: input.author,
        category: input.category,
        tags: input.tags,
        updatedAt: new Date().toISOString(),
      },
    },
  );

  if (result.matchedCount === 0) {
    return null;
  }

  const updatedDocument = await collection.findOne({ _id: objectId });

  return updatedDocument ? toQuote(updatedDocument) : null;
}
