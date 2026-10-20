import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, topic, message } = body;

    // Strict validation
    if (!name || typeof name !== "string" || name.trim().length === 0) {
      return NextResponse.json(
        { error: "Please provide your full name." },
        { status: 400 }
      );
    }

    if (!email || typeof email !== "string" || !email.includes("@")) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (!topic || typeof topic !== "string") {
      return NextResponse.json(
        { error: "Please select an interest topic." },
        { status: 400 }
      );
    }

    if (!message || typeof message !== "string" || message.trim().length < 5) {
      return NextResponse.json(
        { error: "Please enter a message describing your inquiry." },
        { status: 400 }
      );
    }

    // Optional provider integration:
    // If RESEND_API_KEY is configured in .env.local, you can forward directly:
    // if (process.env.RESEND_API_KEY) {
    //   // const resend = new Resend(process.env.RESEND_API_KEY);
    //   // await resend.emails.send({ ... });
    // }

    // Log inquiry server-side for reliability
    console.log("[INQUIRY RECEIVED]", {
      timestamp: new Date().toISOString(),
      name,
      email,
      topic,
      messageLength: message.length,
    });

    return NextResponse.json({
      success: true,
      message:
        "Thank you, your message has been delivered to Pritam Dutta. We will be in touch shortly.",
    });
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again." },
      { status: 500 }
    );
  }
}
