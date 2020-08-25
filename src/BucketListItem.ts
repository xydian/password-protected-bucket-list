/**
 * BucketListItem represents a single list item on my bucket list
 */
export interface BucketListItem {
  /**
   * unique id for BucketListItem
   */
  id: number

  /**
   * title of BucketListItem, what does the user want to achieve
   */
  title: string 

  /**
   * BucketListItem conditions the user has to match to set the list item to completed
   */
  conditions: string 

  /**
   * Whether the user completed the list item
   */
  completed: boolean
}