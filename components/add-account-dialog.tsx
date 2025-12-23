"use client"

import type React from "react"

import {useState} from "react"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Eye, EyeOff} from "lucide-react"
import type {Account} from "@/components/account-list"
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";

type AddAccountDialogProps = {
    open: boolean
    onOpenChange: (open: boolean) => void
    onAdd: (account: Omit<Account, "id">) => void
}

export function AddAccountDialog({open, onOpenChange, onAdd}: AddAccountDialogProps) {
    const [platform, setPlatform] = useState("")
    const [account, setAccount] = useState("")
    const [password, setPassword] = useState("")
    const [showPassword, setShowPassword] = useState(false)
    const [email, setEmail] = useState("")

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        if ( !platform.trim()||!account.trim() || !password.trim() || !email.trim()) {
            alert("请填写所有字段")
            return
        }

        onAdd({
            platform: platform.trim(),
            account: account.trim(),
            password: password.trim(),
            status: "active",
            courseCount: 0,
            lastLogin: new Date().toLocaleString("zh-CN"),
        })

        setPlatform("")
        setAccount("")
        setPassword("")
        setEmail("")
        onOpenChange(false)
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-md">
                <DialogHeader>
                    <DialogTitle>添加新账号</DialogTitle>
                    <DialogDescription>填写账号信息以添加到管理列表</DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="account">平台</Label>
                            <Select value={platform} onValueChange={setPlatform}>
                                <SelectTrigger id="platform" className="w-full">
                                    <SelectValue placeholder="请选择账号平台" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="XUEXITONG">学习通</SelectItem>
                                    <SelectItem value="YINGHUA">英华学堂</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="account">账号</Label>
                            <Input
                                id="account"
                                placeholder="请输入登录账号"
                                value={account}
                                onChange={(e) => setAccount(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">密码/Cookie/Token</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="请输入密码/Cookie/Token"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pr-10"
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    className="absolute right-0 top-0 h-full w-10 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? <EyeOff className="h-4 w-4"/> : <Eye className="h-4 w-4"/>}
                                </Button>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                            取消
                        </Button>
                        <Button type="submit">添加账号</Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    )
}
