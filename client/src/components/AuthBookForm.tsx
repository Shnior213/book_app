import { useForm } from "react-hook-form";
import {
  bookSchema,
  type FormInput,
  type FormOutput,
} from "../schemas/book.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Form } from "../styles/Form";
import { Input } from "../styles/Input";
import { Button } from "../styles/Button";
import { StyledErrorDiv } from "../styles/StyledErrorDiv";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "../services/category.service";

interface CategoryItem {
  id: number;
  name: string;
}

interface BookFormProps {
  initialData?: {
    title: string;
    author: string;
    image?: string;
    categories?: CategoryItem[];
  };
  onSubmit: (data: FormOutput) => void;
  isPending: boolean;
  title: string;
}

const AuthBookForm = ({
  initialData,
  onSubmit,
  isPending,
  title,
}: BookFormProps) => {
  const { data: categories } = useQuery({
    queryFn: () => getCategories(),
    queryKey: ["categories"],
  });

  const [preview, setPreview] = useState<string | null>(
    initialData?.image || null,
  );

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } = useForm<FormInput, any, FormOutput>({
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: initialData?.title || "",
      author: initialData?.author || "",
      categoryIds:
        initialData?.categories?.map((c: CategoryItem) => c.id) || [],
      image: undefined,
    },
  });

  const imageValue = watch("image");

  useEffect(() => {
    if (imageValue instanceof FileList && imageValue.length > 0) {
      const objectUrl = URL.createObjectURL(imageValue[0]);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
  }, [imageValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <h3>{title}</h3>

      <Input {...register("title")} type="text" placeholder="Title" />
      {errors.title && <StyledErrorDiv>{errors.title.message}</StyledErrorDiv>}

      <Input {...register("author")} type="text" placeholder="Author" />
      {errors.author && (
        <StyledErrorDiv>{errors.author.message}</StyledErrorDiv>
      )}

      <Input type="file" {...register("image")} />
      {errors.image && (
        <StyledErrorDiv>{errors.image.message as string}</StyledErrorDiv>
      )}

      <label>Categories (Hold Ctrl/Cmd to select multiple):</label>
      <select
        multiple
        size={5}
        {...register("categoryIds")}
        style={{ width: "250px", padding: "8px", marginBottom: "10px" }}
      >
        {categories?.map((c: CategoryItem) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
      {errors.categoryIds && (
        <StyledErrorDiv>{errors.categoryIds.message as string}</StyledErrorDiv>
      )}
      {preview && (
        <img
          src={preview}
          alt="preview"
          style={{ width: "100px", margin: "10px 0" }}
        />
      )}

      <Button disabled={isPending} type="submit">
        {isPending ? "Loading" : "Submit"}
      </Button>
      {errors.root && <StyledErrorDiv>{errors.root.message}</StyledErrorDiv>}
    </Form>
  );
};

export default AuthBookForm;
