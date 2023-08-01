<?php

namespace App\Http\Actions;

interface ActionInterface
{
    public function handle($requestOrId): array;
}