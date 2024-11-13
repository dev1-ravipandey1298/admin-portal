export const COMMON_ROUTE = `/dp-internal/portal/notification/`;

export const CHILD_PATH = {
	login : `login`,
	maker : `maker`,
	checker : `checker`,
	cugUser : `cug-user`,
	checkerPendingRequest : `checker/pending-requests`,
	checkerShowAll : `checker/show-all`,
	checkerReviewTemplate : `checker/show/nudge-template-form/templateId/:templateId/status/:status`,
	makerCreateTemplate : `maker/create/nudge-template-form`,
	makerDraftTemplate : `maker/drafts/nudge-template-form/templateId/:templateId`,
	makerActionTemplate : `maker/actions/nudge-template-form/templateId/:templateId/status/:status`,
	makerDrafts : `maker/drafts`,
	makerShowAll : `maker/show-all`,
	makerActionTemplatesTable : `maker/action-templates`,
    makerSearchScreenTemplateForm: `maker/veiwDetails/nudge-template-form/templateId/:templateId/status/:status`,
    checkerSearchScreenTemplateForm: `checker/veiwDetails/nudge-template-form/templateId/:templateId/status/:status`
}

export const NAVIGATE_PATH = {
    LOGIN : COMMON_ROUTE + CHILD_PATH.login,
    MAKER : COMMON_ROUTE + CHILD_PATH.maker,
    CHECKER : COMMON_ROUTE + CHILD_PATH.checker,
    CUG_USER : COMMON_ROUTE + CHILD_PATH.cugUser,
    CHECKER_PENDING_REQUEST : COMMON_ROUTE + CHILD_PATH.checkerPendingRequest,
    CHECKER_SHOW_ALL : COMMON_ROUTE + CHILD_PATH.checkerShowAll,
    CHECKER_REVIEW_TEMPLATE : COMMON_ROUTE + `checker/show/nudge-template-form/templateId/`,
    MAKER_CREATE_TEMPLATE : COMMON_ROUTE + CHILD_PATH.makerCreateTemplate,
    MAKER_DRAFT_TEMPLATE : COMMON_ROUTE + `maker/drafts/nudge-template-form/templateId/`,
    MAKER_ACTION_TEMPLATE_FORM : COMMON_ROUTE + `maker/actions/nudge-template-form/templateId/`,
    MAKER_DRAFTS : COMMON_ROUTE + CHILD_PATH.makerDrafts,
    MAKER_SHOW_ALL : COMMON_ROUTE + CHILD_PATH.makerShowAll,
    MAKER_ACTION_TEMPLATE : COMMON_ROUTE + CHILD_PATH.makerActionTemplatesTable,
    MAKER_SEARCH_SCREEN_TEMPLATE_FORM : COMMON_ROUTE + `maker/veiwDetails/nudge-template-form/templateId/`,
    CHECKER_SEARCH_SCREEN_TEMPLATE_FORM : COMMON_ROUTE + `checker/veiwDetails/nudge-template-form/templateId/`
}