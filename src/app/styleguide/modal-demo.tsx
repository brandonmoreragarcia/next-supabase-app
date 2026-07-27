'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Modal } from '@/components/ui/modal';

export function ModalDemo() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button variant="primary" onClick={() => setOpen(true)}>
        Abrir modal
      </Button>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title="Nuevo proyecto"
        footer={
          <>
            <Button onClick={() => setOpen(false)}>Cancelar</Button>
            <Button variant="primary" onClick={() => setOpen(false)}>
              Crear proyecto
            </Button>
          </>
        }
      >
        <div className="grid gap-3">
          <label className="grid gap-1.5 text-xs text-secondary">
            Nombre
            <Input placeholder="Nombre del proyecto" />
          </label>
          <label className="grid gap-1.5 text-xs text-secondary">
            Clave
            <Input placeholder="WEB" className="max-w-24 font-mono uppercase" />
          </label>
        </div>
      </Modal>
    </>
  );
}
