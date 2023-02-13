const mongoose = require("mongoose");

const cpatSchema = new mongoose.Schema({
  productCode:{
    type : String,
  },
  PartClassification: {
    type: String,
    // required: true,
  },

  Relationship: {
    type: String,
    // required: true,
  },
  Parent: {
    type: String,
    // required: true,
  },
  Type: {
    type: String,
    // required: true,
  },
  Name: {
    type: String,
    // required: true,
  },
  Revision: {
    type: String,
    // required: true,
  },
  DisplayName: {
    type: String,
    // required: true,
  },
  DESCRIPTION: {
    type: String,
    // required: true,
  },
  VCDesignStandard: {
    type: String,
    // required: true,
  },
  SupplyResponsibility: {
    type: String,
    // required: true,
  },
  EngineeringDeliveryType: {
    type: String,
    // required: true,
  },
  TobeShipped: {
    type: String,
    // required: true,
  },
  tc_tree_name: {
    type: String,
    // required: true,
  },
  tc_parent_tree_name: {
    type: String,
    // required: true,
  },
  tc_tree_name: {
    type: String,
    // required: true,
  },
  Usage: {
    type: String,
    // required: true,
  },
  FindNumber: {
    type: String,
    // required: true,
  },
  Quantity: {
    type: String,
    // required: true,
  },
  UnitofMeasure: {
    type: String,
    // required: true,
  },
  State:{
    type:String,
  },
  Weight:{
    type:String,
  },
  POTaxCode:{
    type:String,

  },
  POTaxDesc:{
    type:String,
  },
  ItemPricingIdentifier:{
    type:String,

  },
  ManufacturerName:{
    type:String,
  
  },
  ManufacturerModelNumber:{
    type:String,
  },
  ClassificationPath:{
    type : String,
  },
  PreAssembledAtShop:{
    type:String,
  },
  CollaborativeSpace:{
    type:String,
  },
  Originated:{
    type:String,
  },
  Modified:{
    type:String,
  
  },
  Originator:{
    type :String,
  },
  ChangeActions:{
    type : String,

  },
  Specification:{
    type:String,
  },
  Path:{
    type : String,
  }

 
},{timestamps:true});


module.exports = mongoose.model("cpatData", cpatSchema);