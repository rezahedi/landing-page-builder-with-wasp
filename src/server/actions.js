import HttpError from '@wasp/core/HttpError.js'

export const createPage = async (args, context) => {
	if (!context.user) { throw new HttpError(401) }

	return context.entities.Pages.create({
		data: {
			title: args.title,
			slug: args.slug,
			description: args.description,
			user: { connect: { id: context.user.id } }
		}
	})
}

export const updatePage = async (args, context) => {
	if (!context.user) { throw new HttpError(401) }

	return context.entities.Pages.updateMany({
		where: { id: args.pageId, user: { id: context.user.id } },
		data: {
			title: args.data.title,
			slug: args.data.slug,
			description: args.data.description,
			isPublished: args.data.isPublished
		}
	})
}

export const updatePageContent = async (args, context) => {
	if (!context.user) { throw new HttpError(401) }

	return context.entities.Pages.updateMany({
		where: { id: args.pageId, user: { id: context.user.id } },
		data: {
			content: args.data.content,
			contentHtml: args.data.contentHtml
		}
	})
}