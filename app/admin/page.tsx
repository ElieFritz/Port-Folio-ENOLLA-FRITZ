import { AdminEditor } from "@/components/admin-editor";
import { getContentFilePath, getPortfolioContent } from "@/lib/portfolio-content";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const content = await getPortfolioContent();

  return (
    <main className="section-shell pb-20 pt-6 sm:pt-10">
      <AdminEditor
        initialContent={content}
        contentFilePath={getContentFilePath()}
      />
    </main>
  );
}
