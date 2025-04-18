import React, { useState, useMemo } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Cpu, MonitorPlay, Layers } from 'lucide-react';
import { ramSizes, ramTypes, cpuData, gpuData } from '@/lib/pcComponents';
import { PCConfig } from '@/utils/ratingLogic';

interface PCFormProps {
  onSubmit: (config: PCConfig) => void;
}

const PCForm: React.FC<PCFormProps> = ({ onSubmit }) => {
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [ramType, setRamType] = useState('');
  const [ramSize, setRamSize] = useState('');
  const [cpuSearch, setCpuSearch] = useState('');
  const [gpuSearch, setGpuSearch] = useState('');
  
  const filteredCPUs = useMemo(() => {
    if (!cpuSearch) return cpuData;
    return cpuData.filter(cpu => 
      cpu.name.toLowerCase().includes(cpuSearch.toLowerCase()) ||
      cpu.generation.toLowerCase().includes(cpuSearch.toLowerCase())
    );
  }, [cpuSearch]);
  
  const filteredGPUs = useMemo(() => {
    if (!gpuSearch) return gpuData;
    return gpuData.filter(gpu => 
      gpu.name.toLowerCase().includes(gpuSearch.toLowerCase())
    );
  }, [gpuSearch]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cpu && gpu && ramType && ramSize) {
      onSubmit({
        cpu,
        gpu,
        ramType,
        ramSize
      });
    } else {
      alert("Please fill all fields to rate your PC");
    }
  };
  
  return (
    <Card className="glass-card w-full max-w-2xl mx-auto">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Cpu className="h-5 w-5 text-primary" />
              <Label htmlFor="cpu" className="text-lg font-medium">Processor (CPU)</Label>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Search CPU (e.g. Ryzen 9 5900X)"
                value={cpuSearch}
                onChange={(e) => setCpuSearch(e.target.value)}
                className="bg-secondary/50"
              />
              <Select onValueChange={setCpu} value={cpu}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Select CPU" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {filteredCPUs.map((cpuOption) => (
                    <SelectItem key={cpuOption.name} value={cpuOption.name}>
                      {cpuOption.name} ({cpuOption.generation})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <MonitorPlay className="h-5 w-5 text-primary" />
              <Label htmlFor="gpu" className="text-lg font-medium">Graphics Card (GPU)</Label>
            </div>
            <div className="space-y-2">
              <Input
                placeholder="Search GPU (e.g. RTX 3080)"
                value={gpuSearch}
                onChange={(e) => setGpuSearch(e.target.value)}
                className="bg-secondary/50"
              />
              <Select onValueChange={setGpu} value={gpu}>
                <SelectTrigger className="bg-secondary/50">
                  <SelectValue placeholder="Select GPU" />
                </SelectTrigger>
                <SelectContent className="max-h-[300px]">
                  {filteredGPUs.map((gpuOption) => (
                    <SelectItem key={gpuOption.name} value={gpuOption.name}>
                      {gpuOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Layers className="h-5 w-5 text-primary" />
              <Label htmlFor="ram" className="text-lg font-medium">Memory (RAM)</Label>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="ramType" className="text-sm text-muted-foreground mb-1 block">
                  RAM Type
                </Label>
                <Select onValueChange={setRamType} value={ramType}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {ramTypes.map((type) => (
                      <SelectItem key={type.type} value={type.type}>
                        {type.type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="ramSize" className="text-sm text-muted-foreground mb-1 block">
                  RAM Size
                </Label>
                <Select onValueChange={setRamSize} value={ramSize}>
                  <SelectTrigger className="bg-secondary/50">
                    <SelectValue placeholder="Select size" />
                  </SelectTrigger>
                  <SelectContent>
                    {ramSizes.map((size) => (
                      <SelectItem key={size.size} value={size.size}>
                        {size.size}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <Button 
            type="submit"
            className="w-full py-6 text-lg font-medium bg-tech-gradient hover:opacity-90 transition-opacity"
          >
            Rate My PC
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PCForm;
