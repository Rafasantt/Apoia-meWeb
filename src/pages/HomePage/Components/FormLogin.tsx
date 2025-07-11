import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { DialogTitle } from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
import { DrawerClose, DrawerContent, DrawerFooter, DrawerHeader, DrawerTitle } from "@/components/ui/drawer";
import { useMediaQuery } from 'react-responsive'

const signupSchema = z.object({
  email: z.string().email("E-mail inválido").min(1, "E-mail é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

type SignupFormDataSchema = z.infer<typeof signupSchema>;

type DialogFormProps = {
  isOpen: boolean;
  onClose: () => void;
};

export function DrawerDialogLogin({ isOpen, onClose }: DialogFormProps) {

  const isDesktop = useMediaQuery({ query: '(min-width: 768px)' });

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose()
    }
  };

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-gray-600 text-center">Login</DialogTitle>
          </DialogHeader>
          <LoginForm />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Login</DrawerTitle>
        </DrawerHeader>
        <LoginForm />
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline" size={"sm"} className="w-[80%] flex m-auto">Cancelar</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer.Root>
  );
}

export default function LoginForm() {
  const form = useForm<SignupFormDataSchema>({
    resolver: zodResolver(signupSchema),
  });
  const navigate = useNavigate();

  function onSubmit(data: SignupFormDataSchema) {
    console.log(data);
    navigate("/dashboard");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 bg-white rounded-lg p-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Senha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <Button
          size={"sm"}
          className='bg-blue-500 hover:bg-blue-600 cursor-pointer w-[100%] flex m-auto'
          type="submit"
        >
          Entrar
        </Button>
      </form>
    </Form>
  )
}