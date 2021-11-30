import { Value } from "@graphprotocol/graph-ts"
import { FilledListing } from "../generated/Contract11/Contract"
import { FilledListing as OldFilledListing } from "../generated/Contract12/Contract"
import { Sold } from "../generated/schema"

export function handle(event: FilledListing): void {
    let _listing = event.params.listing;
    let buyer = _listing.buyer;
    let listing = _listing.listing;
  
    let sold = new Sold(listing.id.toString());
    sold.set("listing", Value.fromBigInt(listing.id));
    sold.set("tx", Value.fromBytes(event.transaction.hash));
    sold.set("newOwner", Value.fromAddress(buyer));
    sold.set("oldOwner", Value.fromAddress(listing.owner));
    sold.set("tokenId", Value.fromBigInt(listing.tokenId));
    sold.set("price", Value.fromBigInt(listing.price));
    sold.set("timestamp", Value.fromBigInt(event.block.timestamp));

    sold.save()
}

export function handleOld(event: OldFilledListing): void {
    let listing = event.params.listing;
  
    let sold = new Sold("o."+listing.id.toString());
    sold.set("listing", Value.fromBigInt(listing.id));
    sold.set("tx", Value.fromBytes(event.transaction.hash));
    sold.set("newOwner", Value.fromAddress(event.transaction.from));
    sold.set("oldOwner", Value.fromAddress(listing.owner));
    sold.set("tokenId", Value.fromBigInt(listing.tokenId));
    sold.set("price", Value.fromBigInt(listing.price));
    sold.set("timestamp", Value.fromBigInt(event.block.timestamp));

    sold.save()
}
