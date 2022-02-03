/**
 * Policy Mappings
 * (sails.config.policies)
 *
 * Policies are simple functions which run **before** your actions.
 *
 * For more information on configuring policies, check out:
 * https://sailsjs.com/docs/concepts/policies
 */

module.exports.policies = {

  /*****************************receive**********************************************
  *                                                                          *
  * Default policy for all controllers and actions, unless overridden.       *
  * (`true` allows public access)                                            *
  *                                                                          *
  ***************************************************************************/

  '*': ['apiAuth', 'lang'],

  /**************************************************************************
  * CUSTOMER ENDPOINTS
  *************************************************************************/

  'customers/code/send'                   : ['apiAuth', 'lang'],
  'customers/code/verify'                 : ['apiAuth', 'lang', 'device'],

  'customers/profile/item'                : ['apiAuth', 'lang', 'device', 'customer'],
  'customers/profile/update'              : ['apiAuth', 'lang', 'device', 'customer'],

  'customers/message/send'                : ['apiAuth', 'lang', 'device', 'customer'],
  'customers/message/get'                 : ['apiAuth', 'lang', 'device', 'customer'],

};
