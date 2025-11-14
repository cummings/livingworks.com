"use server"

import { Client } from "@notionhq/client"

export async function submitContactForm(formData: FormData) {
  const name = formData.get("name") as string
  const email = formData.get("email") as string
  const phone = formData.get("phone") as string | null
  const company = formData.get("company") as string | null
  const message = formData.get("message") as string

  // Validate required fields
  if (!name || !email || !message) {
    return { success: false, error: "Name, email, and message are required" }
  }

  try {
    const notion = new Client({
      auth: process.env.NOTION_API_KEY,
    })

    const databaseId = process.env.NOTION_DATABASE_ID

    if (!databaseId) {
      console.error("[v0] NOTION_DATABASE_ID is not set")
      return { success: false, error: "Notion database not configured" }
    }

    await notion.pages.create({
      parent: {
        database_id: databaseId,
      },
      properties: {
        Name: {
          title: [
            {
              text: {
                content: name,
              },
            },
          ],
        },
        Email: {
          email: email,
        },
        ...(phone && {
          Phone: {
            phone_number: phone,
          },
        }),
        ...(company && {
          Company: {
            rich_text: [
              {
                text: {
                  content: company,
                },
              },
            ],
          },
        }),
        Message: {
          rich_text: [
            {
              text: {
                content: message,
              },
            },
          ],
        },
        "Submitted At": {
          date: {
            start: new Date().toISOString(),
          },
        },
      },
    })

    return { success: true }
  } catch (error) {
    console.error("[v0] Error submitting to Notion:", error)
    return { success: false, error: "Failed to submit form" }
  }
}
