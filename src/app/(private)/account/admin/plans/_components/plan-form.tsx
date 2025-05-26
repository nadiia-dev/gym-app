"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface Props {
  formMode: "add" | "edit";
  initialValues?: any;
}

const formSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  features: z.array(z.string()).nonempty("Features is required"),
  monthly_price: z.coerce.number(),
  quarterly_price: z.coerce.number(),
  half_yearly_price: z.coerce.number(),
  yearly_price: z.coerce.number(),
});

const PlanForm = ({ formMode, initialValues }: Props) => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedFiles, setSelectedFiles] = useState<any[]>([]);
  const form: any = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      features: initialValues?.features || [],
      monthly_price: initialValues?.monthly_price || 0,
      quarterly_price: initialValues?.quarterly_price || 0,
      half_yearly_price: initialValues?.half_yearly_price || 0,
      yearly_price: initialValues?.yearly_price || 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  const { fields, remove, append } = useFieldArray({
    control: form.control,
    name: "features",
  });

  const pricingFields = [
    "monthly_price",
    "quarterly_price",
    "half_yearly_price",
    "yearly_price",
  ];

  const onRemoveFiles = (index: number) => {
    const tmp = [...selectedFiles];
    tmp.splice(index, 1);
    setSelectedFiles(tmp);
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter your full name" {...field} />
                </FormControl>
                <FormDescription>Name</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea {...field} />
                </FormControl>
                <FormDescription>Description</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <fieldset className="p-5 border border-gray-400">
            <legend className="bg-white px-5 text-sm">Features</legend>

            <div className="flex flex-col gap-5">
              {fields.map((field, index) => (
                <FormField
                  control={form.control}
                  name={`features.${index}`}
                  key={field.id}
                  render={({ field }) => (
                    <FormItem className="flex items-center gap-5">
                      <FormControl>
                        <Input placeholder="" {...field} />
                      </FormControl>
                      <Button
                        type="button"
                        onClick={() => remove(index)}
                        variant={"outline"}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </FormItem>
                  )}
                />
              ))}
            </div>
            <Button
              variant={"outline"}
              size={"sm"}
              onClick={() => append("")}
              type="button"
              className="mt-7"
            >
              Add Feature
            </Button>
          </fieldset>

          <fieldset className="p-5 border border-gray-400">
            <legend className="bg-white px-5 text-sm">Pricing</legend>

            <div className="grid grid-cols-4 gap-5">
              {pricingFields.map((item) => (
                <FormField
                  control={form.control}
                  name={item}
                  key={item}
                  render={({ field }) => (
                    <FormItem>
                      <label className="text-xs">
                        {item.replace("_", " ").toUpperCase()}
                      </label>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder=""
                          {...field}
                          onChange={(e) => {
                            field.onChange(e.target.valueAsNumber);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              ))}
            </div>
          </fieldset>

          <div className="flex flex-col gap-3">
            <FormLabel className="block">Images</FormLabel>
            <Input
              type="file"
              multiple
              onChange={(e: any) => {
                setSelectedFiles([...selectedFiles, ...e.target.files]);
              }}
            />
            <div className="flex flex-wrap gap-5">
              {selectedFiles.map((file, index) => (
                <div
                  className="border p-2 rounded border-gray-300 flex items-center justify-center flex-col"
                  key={index}
                >
                  <img
                    src={URL.createObjectURL(file)}
                    className="w-20 h-20 object-contain"
                  />
                  <span
                    className="text-gray-500 text-xs cursor-pointer underline text-center w-full"
                    onClick={() => onRemoveFiles(index)}
                  >
                    Remove
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-5">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/account/admin/plans")}
            >
              Cancel
            </Button>
            <Button disabled={loading} type="submit">
              Submit
            </Button>
          </div>
        </form>
      </Form>
    </>
  );
};

export default PlanForm;
