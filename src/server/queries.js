import HttpError from '@wasp/core/HttpError.js'

export const getPages = async (args, context) => {
	if (!context.user) { throw new HttpError(401) }
	return context.entities.Pages.findMany(
		{ where: { user: { id: context.user.id } } }
	)
}

export const getPage = async (args, context) => {
	if (!context.user) { throw new HttpError(401) }

	return context.entities.Pages.findFirst({
		where: { id: args.pageId, user: { id: context.user.id } }
	})
}