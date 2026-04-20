curl -X 'POST' \
  'https://localhost:7189/API/MATERIAL/ITEM_SUB_CATEGORY/ADD-ITEM_SUB_CATEGORY' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json-patch+json' \
  -d '{
  "subcatG_CODE": "str",
  "desc": "string",
  "catG_CODE": "st",
  "excise": "s",
  "acC_CODE": "string",
  "modvat": "s",
  "cenvaT_PERCENT": 0,
  "category_type": "st",
  "in_use": true,
  "planAndMachinary": "s",
  "planAndMachinaryOld": "s",
  "itemWtPercent": 0,
  "item_Spec_category": "st",
  "life_applicable": "s",
  "hsn_code": "string"
}'
Request URL
https://localhost:7189/API/MATERIAL/ITEM_SUB_CATEGORY/ADD-ITEM_SUB_CATEGORY
Server response
Code	Details
200	
Response body
Download
{
  "message": "ITEM SUB CATEGORY Added successfully!",
  "SUBCATG_CODE": "str"
}
Response headers



curl -X 'POST' \
  'https://localhost:7189/API/MATERIAL/ITEM_CATEGORY_DETAILS/ADD-ITEM_CATEGORY_D' \
  -H 'accept: */*' \
  -H 'Content-Type: application/json-patch+json' \
  -d '{
  "catG_CODE": "st",
  "desc": "string",
  "indicator": "st",
  "raw_ind": "s",
  "other_ind": "st",
  "iN_use": true,
  "loc": "s",
  "imp_Material": "s",
  "auto_Subcatg_no": "str",
  "lW_Value": "s"
}'
Request URL
https://localhost:7189/API/MATERIAL/ITEM_CATEGORY_DETAILS/ADD-ITEM_CATEGORY_D
Server response
Code	Details
200	
Response body
Download
{
  "message": "ITEM CATEGORY DETAILS Added successfully!",
  "CATG_CODE": "st"
}
Response headers